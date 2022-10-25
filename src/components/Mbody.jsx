import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaThermometerFull,FaThermometerEmpty,FaWind,FaEye} from 'react-icons/fa';
import { WiBarometer ,WiHumidity} from "react-icons/wi";

function Mbody()
{
    const apiKEY="be501f847a36583561b10b049b488d16";
    const [data,setData]=useState({});
    const [city, setCity]=useState("");
    const handleChange=(e)=>{
        setCity(e.target.value)
    }
    const handleSearch=()=>{
        getWeather(city);
    }
    const getWeather=(city) =>{
        if(!city)
        return;
        const apiURL="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKEY;
        axios.get(apiURL).then((res)=>{
            console.log(res);
            setData(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getWeather("Delhi");
    },[])

    return(
        <div>
            <div class="pl-20 pt-10 flex justify-center">
                <div class="xl:w-96 h-10">
                    <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                        <input type="search" onChange={handleChange} value={city} class="bg-cyan-200 color-black-800 shadow-lg shadow-black form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal 
                        text-gray-800 bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 
                        focus:text-gray-800 focus:bg-cyan-100  focus:border-blue-600 focus:outline-none text-center placeholder-gray-600"
                        placeholder="Enter the city name" aria-label="Search" aria-describedby="button-addon3"/>
                    </div>
                </div>
                <button class="btn ml-2 shadow-lg shadow-black inline-block px-4 py-2 bg-blue-600 text-white font-medium text-sm leading-tight
                rounded-3xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:shadow-black focus:outline-none
                focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" 
                type="button" id="button-addon2" onClick={handleSearch}>Search</button>
            </div>
            {Object.keys(data).length>0&&
            <div class="pt-16 flex justify-center">
                <div class="p-5 bg-cyan-400 w-96 h-auto shadow-lg shadow-black max-w-sm rounded-3xl overflow-hidden shadow-lg">
                    <div class="grid place-items-center">
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        alt="weather status icon"
                        className="weather-icon h-20 w-20"/> 
                        <p class="text-gray-800 text-base">{data.weather[0].description}</p>
                        <div class="font-extrabold text-2xl">{((data?.main?.temp)).toFixed(2)}°C</div>
                        <div class="text-gray-800 text-sm mb-1">Feels Like {((data?.main?.feels_like)).toFixed(2)}°C</div>
                        <p class="font-medium text-md">{data?.name}</p>
                    </div>
                    <div class="pt-8 grid place-items-center grid-cols-2 gap-12">
                        <div className="grid place-items-center text-center">
                            <FaThermometerEmpty className="text-xl"/>
                            Min: {data.main.temp_min}°C
                        </div>
                        <div className="grid place-items-center text-center">
                            <FaThermometerFull className="text-xl"/>
                            Max: {data.main.temp_max}°C
                        </div>
                        <div className="grid place-items-center text-center">
                            <WiHumidity className="text-3xl"/>
                            Humidity: {data.main.humidity}%
                        </div>
                        <div className="grid place-items-center text-center">
                            <WiBarometer className="text-3xl"/>
                            Pressure: {data.main.pressure} Pa
                        </div>
                        
                        <div className="grid place-items-center text-center">
                            <FaEye className="text-xl"/>
                            Visibility: {data.visibility}
                        </div>
                        <div className="grid place-items-center text-center">
                            <FaWind className="text-xl"/>
                            Wind: {data.wind.speed} knots
                        </div>
                    </div>
                </div>
            </div>}
            <p className="bottom-0 text-white text-center text-xl pt-10 pb-6">© 2022 Abhay Semwal. All rights reserved.</p>
        </div>
   );
}
export default Mbody;