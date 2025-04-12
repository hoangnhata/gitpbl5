/* eslint-disable react/prop-types */
import { useState } from 'react';
import MapGl from 'react-map-gl'
import {MapControlFullscreen, MapControlGeolocate, MapControlMarker, MapControlNavigation, MapControlScale} from '../../components/map'

const Map =({data, ...other}) =>{
    const [tooltip,setTooltip] =useState(null);
    const [viewport,setViewport] = useState({
        zoom:2,
    })

    return(
        <>
        <MapGl {...viewport} onViewportChange={setViewport} {...other} >
            <MapControlScale />
            <MapControlNavigation />
            <MapControlFullscreen />
            <MapControlGeolocate />

            {data.map((country) => (
                <MapControlMarker
                key={country.name}
                latitude={country.latlng[0]}
                longitude={country.latlng[1]}
                onClick={() => setTooltip(country)}
                />
            ))}

        </MapGl>
        </>
    )
}

export default Map;