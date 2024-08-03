import React, { useEffect } from 'react';
import MapOverlay from './MapOverlay';

const MapMarker = ({ map, positions }) => {
    const { kakao } = window;
    let activeOverlay = null;

    useEffect(() => {
        if (positions.length > 0) {
            positions.forEach(position => {
                var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                var imageSize = new kakao.maps.Size(24, 35);
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: position.latlng,
                    title: position.title,
                    image: markerImage
                });

                var overlayContent = document.createElement('div');
                overlayContent.innerHTML = MapOverlay({ 
                    title: position.title,
                    availParkSpace: position.availParkSpace,
                    totalSpace: position.totalSpace,
                    address: position.address,
                    parkingType: position.parkingType,
                    operationType: position.operationType,
                    phoneNumber: position.phoneNumber,
                    freeOrNot: position.freeOrNot,
                    nightFreeOpenName: position.nightFreeOpenName,
                    weekdayOpenTime: position.weekdayOpenTime,
                    weekdayCloseTime: position.weekdayCloseTime,
                    weekendOpenTime: position.weekendOpenTime,
                    weekendCloseTime: position.weekendCloseTime,
                    holidayOpenTime: position.holidayOpenTime,
                    holidayCloseTime: position.holidayCloseTime,
                    saturdayFreeOrNot: position.saturdayFreeOrNot,
                    holidayFreeOrNot: position.holidayFreeOrNot,
                    monthlyTicketAmount: position.monthlyTicketAmount,
                    baseParkingFee: position.baseParkingFee,
                    baseParkingTime: position.baseParkingTime,
                    additionalFee: position.additionalFee,
                    additionalTime: position.additionalTime,
                    maxDailyFee: position.maxDailyFee
                });

                var overlay = new kakao.maps.CustomOverlay({
                    content: overlayContent,
                    map: map,
                    position: marker.getPosition()
                });

                overlay.setMap(null);

                kakao.maps.event.addListener(marker, 'click', () => {
                    if (activeOverlay) {
                        activeOverlay.setMap(null);
                    }
                    overlay.setMap(map);
                    overlayContent.style.display = 'block';
                    activeOverlay = overlay;
                });

                overlayContent.querySelector('.close').addEventListener('click', () => {
                    overlayContent.style.display = 'none';
                    activeOverlay = null;
                });
            });
        }
    }, [map, positions]);

    return null;
};

export default MapMarker;
