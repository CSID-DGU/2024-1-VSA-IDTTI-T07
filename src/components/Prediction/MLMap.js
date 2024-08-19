import React, { useEffect, useState } from 'react';
import { useLatLng } from '../Location/LatLngContext';
import MLMapMarker from './MLMapMarker';
import ParkPredictFetcher from './ParkPredictFetcher';
import '../Map/Map.css';
import ZoomButton from '../Button/ZoomButton';
import MyLocationButton from '../Button/MyLocationButton';
import { DistanceProvider } from './DistanceContext';

// 주차장 데이터를 정렬하여 상위 5개만 반환하는 함수
const sortParkingData = (parkingData) => {
    return parkingData
        .filter(parking => 
            parking.predictedSpace > 0 && 
            !parking.parkingName.includes("버스전용") // "버스전용"이 포함된 주차장 제외
        )
        .sort((a, b) => {
            // 남은 자리가 5자리 이상인 경우, 요금을 기준으로 정렬
            if (a.predictedSpace >= 5 && b.predictedSpace >= 5) {
                return a.baseParkingFee - b.baseParkingFee;
            }
            // 남은 자리가 5자리 미만인 경우, 남은 자리를 기준으로 정렬
            if (a.predictedSpace < 5 && b.predictedSpace < 5) {
                return b.predictedSpace - a.predictedSpace;
            }
            // 남은 자리가 5자리 이상인 주차장이 우선
            if (a.predictedSpace >= 5 && b.predictedSpace < 5) {
                return -1;
            }
            if (a.predictedSpace < 5 && b.predictedSpace >= 5) {
                return 1;
            }
            return 0;
        })
        .slice(0, 5); // 상위 5개만 반환
};

const MLMap = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);
    const [positions, setPositions] = useState([]);
    const [parkingData, setParkingData] = useState([]);
    const { latLng } = useLatLng();

    useEffect(() => {
        if (!latLng) return;

        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(latLng.lat, latLng.lng),
            level: 4
        };

        var map = new kakao.maps.Map(container, options);
        setMap(map);

        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latLng.lat, latLng.lng),
            map: map
        });

        var circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(latLng.lat, latLng.lng),
            radius: 500,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.2
        });
        circle.setMap(map);
        
    }, [latLng]);

    // 주차장 데이터를 정렬하여 상위 5개만 표시
    const sortedParkingData = sortParkingData(parkingData);

    useEffect(() => {
        if (map && sortedParkingData.length > 0) {
            // 기존 마커를 제거하기 위해
            map.markers = map.markers || [];
            map.markers.forEach(marker => marker.setMap(null));
            map.markers = [];

            sortedParkingData.forEach((item, index) => {
                var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 URL
                var imageSize = new kakao.maps.Size(36, 37); // 마커 이미지 크기
                var imgOptions = {
                    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin: new kakao.maps.Point(0, (index * 46) + 10), // 스프라이트 이미지에서 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                };
                var markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize, imgOptions);

                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(item.latitude, item.longitude),
                    map: map,
                    image: markerImage,
                    title: item.parkingName
                });
                map.markers.push(marker);
            });
        }
    }, [map, sortedParkingData]);

    return (
        <DistanceProvider>
            <div className="map-container">
                <div id="map"></div>
                <div className="map-info">
                    {sortedParkingData.length > 0 ? (
                        <ul>
                            {sortedParkingData.map((item, index) => (
                                <li key={index}>
                                    <h3>{index + 1}. {item.parkingName}</h3> {/* 번호 추가 */}
                                    <p>주소: {item.address}</p>
                                    <p>기본 주차 요금(5분): {item.baseParkingFee} 원</p>
                                    <p>거리: {item.distance ? item.distance.toFixed(2) + ' km' : '정보 없음'}</p>
                                    <p>예측 빈자리: {item.predictedSpace !== null ? item.predictedSpace : '정보 없음'}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>주변에 주차장이 없습니다</p>
                    )}
                </div>
                <ParkPredictFetcher setPositions={setPositions} />
                {map && (
                    <>
                        <MLMapMarker 
                            map={map} 
                            positions={positions}
                            setParkingData={setParkingData} 
                        />
                        <ZoomButton map={map} />
                        <MyLocationButton map={map} />
                    </>
                )}
            </div>
        </DistanceProvider>
    );
};

export default MLMap;