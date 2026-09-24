
            const cityName = document.getElementById("cityInput");
            const getWeatherBtn = document.getElementById("getWeatherBtn");
            const resultWeather = document.querySelector(".result-weath");
         
            let informationNew = JSON.parse(localStorage.getItem('weather') || '[]');
            if (!Array.isArray(informationNew)) {
                           informationNew = [];
                    }
            async function getWeather(){
                const city = cityName.value.trim();
                if(!city){
                    resultWeather.textContent = "Pleae enter your city ";
                return;           
                 };
                 try{
                    resultWeather.textContent = "loading ..."
             
                const apiKey = "2f924ffe7defac49bd7c162ab790feb6";
                const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            
             
                const response1 = await fetch(url1);
                if(!response1.ok){
                    if(response1.status === 401){
                        throw new Error("invalid or inactive API key")
                    }else if(response1 === 404){
                        throw new Error("City not found")
                    }
                }
                 const data1 = await response1.json();
                 const temp = data1.main.temp;
                 const description = data1.weather[0].description;
                 const wind = data1.wind.speed;
                 resultWeather.textContent = `Temperature: ${temp}°C, Description: ${description} , wind :${wind}`;
                console.log(data1);
               
            
                saveData(city , temp , description , wind);
              
            }catch(error){
                resultWeather.textContent = `Error: ${error.message}`;
            }
        };
        function saveData(city , temp , description , wind){
            const information = {
            city : city,
            temp : temp,
            description : description,
            wind : wind,
            date: new Date().toLocaleTimeString()
            }
            informationNew.push(information);

            localStorage.setItem("weather", JSON.stringify(informationNew));
        }
       
          
    getWeatherBtn.addEventListener("click" ,()=>{
                getWeather();
            

    } )
                
             
        