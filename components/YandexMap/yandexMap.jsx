import { FullscreenControl, Map, Placemark, YMaps } from "react-yandex-maps";

const YandexMap = () => {
  const placeMark = {
    geometry: [41.326964, 69.255653],
    properties: {
      hintContent: "kitmach",
      cursor: "pointer",
    },
    options: { hasHint: true },
    modules: ["geoObject.addon.hint"],
  };
  return (
    <YMaps>
      <div className="test">
        <Map
          defaultState={{
            center: [41.326964, 69.255653],
            zoom: 18,
          }}
          width="100%"
          height="500px"
        >
          <Placemark {...placeMark} />
          <FullscreenControl options={{ float: "right" }} />
        </Map>
      </div>
    </YMaps>
  );
};

export default YandexMap;
