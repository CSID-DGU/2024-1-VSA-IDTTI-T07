const MapOverlay = ({ title }) => {
    const overlayContent = 
    `
        <div class="wrap" id="overlay-${title}">
            <div class="info">
                <div class="title">
                    ${title}
                    <div class="close" title="닫기" onclick="document.getElementById('overlay-${title}').style.display='none';"></div>
                </div>
                <div class="body">
                    <div class="img">
                        <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70" alt="${title}" />
                    </div>
                    <div class="desc">
                        <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                        <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                        <div><a href="https://www.kakaocorp.com/main" target="_blank" rel="noopener noreferrer" class="link">홈페이지</a></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    return overlayContent;
};

export default MapOverlay;
