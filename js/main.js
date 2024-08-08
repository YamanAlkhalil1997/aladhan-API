
// let cities = ['أبو ظبي', 'دبي', 'الشارقة', 'عجمان','رأس الخيمة','أم القيوين','الفجيرة'];
let cities = [
    {
        inArabic : 'دبي',
        Name : 'Dubai'
    },
    {
        inArabic : 'أم القيوين',
        Name : 'Umm Al Quwain'
    },
    {
        inArabic : 'رأس الخيمة',
        Name : 'Ras Al Khaimah'
    },
    {
        inArabic : 'عجمان',
        Name : 'Ajmān'
    },
    {
        inArabic : 'الشارقة',
        Name : 'Sharjah'
    },
    {
        inArabic : 'الفجيرة',
        Name : 'Fujairah'
    },
    {
        inArabic : 'أبو ظبي',
        Name : 'Abu Dhabi'
    },
];
// 

for (city of cities) {
    const content = `
    <option> ${city.inArabic}</option>
    `
    document.getElementById("select").innerHTML += content;
}



// --------------------------------------------------------
document.getElementById("select").addEventListener("change" , ()=> {
    let value = document.getElementById("select").value;
    let cityNow = document.querySelector(".title h1");
    let ci = '';
    for(let city of cities)  {
        if (city.inArabic == value) {
            ci = city.Name;
            cityNow.innerHTML = `<h1>مواقيت الصلاه في ${city.inArabic}</h1>`
        }
    }
    getPayer(ci)
})

// --------------------------------------------------------

    function getPayer (city) {
        let prarms = {
            country: "AE",
            city:city
        };
        axios.get('http://api.aladhan.com/v1/timingsByCity',{
            params:prarms
        })
        .then((response) => {
            const timing = response.data.data.timings;
            fillTime("isha",timing.Isha)
            fillTime("magrep",timing.Maghrib)
            fillTime("aser",timing.Asr)
            fillTime("doher",timing.Dhuhr)
            fillTime("shorok",timing.Sunrise)
            fillTime("fjer",timing.Fajr)
            const radable = response.data.data.date.readable;
            const week = response.data.data.date.hijri.weekday.ar
            const year = response.data.data.date.hijri.month.ar
            let hour = document.querySelector("#hour").innerHTML = week + " " + radable;
            
          
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    getPayer("Dubai")
    function fillTime(id,time) {
        document.getElementById(id).innerHTML = time
    }

    setInterval(()=> {
        let hour = new Date();
        let now = hour.toLocaleTimeString('ar-SA', {
            hour12:true
        });
        document.querySelector(".hour p").innerHTML = now
    
    },1000)
  
