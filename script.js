// Global Variables
let birthdate;
let birthtime;
let intervalId;
let countdownInterval;

// Zodiac Signs Data
const zodiacSigns = {
    "الجدي": {
        traits: "صلابة، عملية، منظمة",
        advice: "استمتع بالتحديات وابق متفائلاً."
    },
    "الدلو": {
        traits: "مبتكر، مستقل، غير تقليدي",
        advice: "ابحث عن التوازن بين الحرية والمسؤولية."
    },
    "الحوت": {
        traits: "حنون، خيالي، حساس",
        advice: "استغل وقتك للاسترخاء والتأمل."
    },
    "الحمل": {
        traits: "شجاع، طموح، عفوي",
        advice: "ابتعد عن التسرع وفكر قبل أن تتصرف."
    },
    "الثور": {
        traits: "ثابت، عملي، متسق",
        advice: "حاول أن تكون أكثر مرونة وافتح عقلك للجديد."
    },
    "الجوزاء": {
        traits: "متحرك، متفتح، فضولي",
        advice: "استمتع بالتواصل مع الآخرين وتبادل الأفكار."
    },
    "السرطان": {
        traits: "عاطفي، حساس، طموح",
        advice: "ابحث عن التوازن بين العاطفة والعقل."
    },
    "الأسد": {
        traits: "كريم، طموح، قيادي",
        advice: "ابتعد عن الأنانية واستمتع بالعمل الجماعي."
    },
    "العذراء": {
        traits: "منظم، متأني، تحليلي",
        advice: "لا تنسى أن تسترخي وتستمتع بالحياة."
    },
    "الميزان": {
        traits: "جمالي، عادل، متوازن",
        advice: "ابحث عن التوازن في جميع مجالات حياتك."
    },
    "العقرب": {
        traits: "قوي، عميق، غامض",
        advice: "حاول أن تكون أكثر انفتاحاً وتواصل مع الآخرين."
    },
    "القوس": {
        traits: "متحمس، مغامر، طموح",
        advice: "ابتعد عن التهور وفكر في العواقب."
    }
};

// Function to Load Sections
function loadSection(section) {
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('ageSection').classList.add('hidden');
    document.getElementById('zodiacSection').classList.add('hidden');
    document.getElementById('loveSection').classList.add('hidden');
    
    const sectionElement = document.getElementById(section + 'Section');
    sectionElement.classList.remove('hidden');
    setTimeout(() => {
        sectionElement.classList.add('show');
    }, 10); // Small delay to ensure the animation is applied correctly
}

// Function to Go Back to Main Page
function goBack() {
    document.getElementById('mainPage').classList.remove('hidden');
    document.getElementById('ageSection').classList.remove('show');
    document.getElementById('zodiacSection').classList.remove('show');
    document.getElementById('loveSection').classList.remove('show');
    
    setTimeout(() => {
        document.getElementById('mainPage').classList.add('show');
        document.getElementById('ageSection').classList.add('hidden');
        document.getElementById('zodiacSection').classList.add('hidden');
        document.getElementById('loveSection').classList.add('hidden');
    }, 10); // Small delay to ensure the animation is applied correctly
}

// Function to Calculate Age
function calculateAge() {
    const birthdateString = document.getElementById('birthdate').value;
    const birthtimeString = document.getElementById('birthtime').value;
    if (!birthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }
    if (!birthtimeString) {
        alert('يرجى إدخال ساعة الميلاد.');
        return;
    }

    birthdate = new Date(birthdateString + 'T' + birthtimeString);
    const today = new Date();

    if (today < birthdate) {
        alert('تاريخ الميلاد يجب أن يكون قبل اليوم.');
        return;
    }

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(updateAge, 1000);
    updateAge();
    calculateNextBirthday();
    const customAdvice = getCustomAdvice(new Date().getFullYear() - birthdate.getFullYear());
    updateResultTable('ageResultTable', 'نصيحة مخصصة', customAdvice);
}

// Function to Update Result Table
function updateResultTable(tableId, key, value) {
    const table = document.getElementById(tableId);
    table.style.display = 'table';
    
    const cellId = key.replace(/\s+/g, ''); // Remove spaces to form a valid ID
    const cell = document.getElementById(cellId);
    if (cell) {
        cell.textContent = value;
    }
}

// Function to Update Age
function updateAge() {
    const today = new Date();
    const ageMilliseconds = today - birthdate;
    
    // Calculate years, months, and days accurately
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    // Correct calculations if the current day is before the birth day in the current month
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // Correct calculations if the current month is before the birth month
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate weeks and remaining days
    const totalDays = Math.floor(ageMilliseconds / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    // Calculate hours, minutes, and seconds
    let hours = today.getHours() - birthdate.getHours();
    let minutes = today.getMinutes() - birthdate.getMinutes();
    let seconds = today.getSeconds() - birthdate.getSeconds();

    // Correct calculations for hours, minutes, and seconds
    if (seconds < 0) {
        minutes--;
        seconds += 60;
    }
    if (minutes < 0) {
        hours--;
        minutes += 60;
    }
    if (hours < 0) {
        days--;
        hours += 24;
    }

    // Update the result table
    updateResultTable('ageResultTable', 'عمرك', `${years} سنة و ${months} أشهر و ${days} أيام و ${hours} ساعات و ${minutes} دقائق و ${seconds} ثواني`);
    updateResultTable('ageResultTable', 'العمر بالأشهر', `${years * 12 + months} أشهر و ${days} أيام`);
    updateResultTable('ageResultTable', 'العمر بالأسابيع', `${weeks} أسابيع و ${remainingDays} أيام`);
    updateResultTable('ageResultTable', 'العمر بالأيام', `${totalDays} أيام`);
    updateResultTable('ageResultTable', 'العمر بالساعات', `${Math.floor(ageMilliseconds / (1000 * 60 * 60))} ساعات`);
    updateResultTable('ageResultTable', 'العمر بالدقائق', `${Math.floor(ageMilliseconds / (1000 * 60))} دقائق`);
    updateResultTable('ageResultTable', 'العمر بالثواني', `${Math.floor(ageMilliseconds / 1000)} ثواني`);
}

// Function to Calculate Next Birthday
function calculateNextBirthday() {
    const today = new Date();
    let nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeDifference = nextBirthday - now;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            updateResultTable('ageResultTable', 'عيد ميلادك القادم', 'عيد ميلادك اليوم!');
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        updateResultTable('ageResultTable', 'عيد ميلادك القادم', `${days} يوم, ${hours} ساعة, ${minutes} دقيقة, ${seconds} ثانية`);
    }, 1000);
}

// Function to Calculate Zodiac
function calculateZodiac() {
    const zodiacBirthdateString = document.getElementById('zodiacBirthdate').value;
    if (!zodiacBirthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }

    const zodiacBirthdate = new Date(zodiacBirthdateString);
    findZodiacSign(zodiacBirthdate);
}

// Function to Find Zodiac Sign
function findZodiacSign(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let zodiacSign = '';

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
        zodiacSign = "الدلو";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        zodiacSign = "الحوت";
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        zodiacSign = "الحمل";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        zodiacSign = "الثور";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        zodiacSign = "الجوزاء";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        zodiacSign = "السرطان";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        zodiacSign = "الأسد";
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        zodiacSign = "العذراء";
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        zodiacSign = "الميزان";
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
        zodiacSign = "العقرب";
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
        zodiacSign = "القوس";
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
        zodiacSign = "الجدي";
    }

    const signInfo = zodiacSigns[zodiacSign];
    updateResultTable('zodiacResultTable', 'البرج', zodiacSign);
    updateResultTable('zodiacResultTable', 'صفات البرج', signInfo.traits);
    updateResultTable('zodiacResultTable', 'نصيحة البرج', signInfo.advice);
}

// Function to Randomize Birth Time
function randomizeBirthTime() {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const birthtime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
    document.getElementById('birthtime').value = birthtime;
}

// Function to Contact Developer
function contactDeveloper() {
    window.location.href = 'https://wa.me/2001104865607';
}

// Function to Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.querySelector('.toggle-dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙';
    } else {
        toggleButton.textContent = '☀️';
    }
}

// Function to Get Custom Advice
function getCustomAdvice(age) {
    if (age < 13) {
        return "احرص على طاعة والديك وأداء واجباتك المدرسية بإتقان.";
    } else if (age < 20) {
        return "تقرب إلى الله ولا تنس صلواتك. استثمر وقتك في تطوير مهاراتك وتحديد أهدافك المستقبلية.";
    } else if (age < 30) {
        return "ابحث عن فرص لتطوير حياتك المهنية وفكر في بناء مستقبلك.";
    } else if (age < 40) {
        return "عامل أولادك باحترام وعلمهم العبادات. اهتم بصحتك البدنية والنفسية.";
    } else if (age < 50) {
        return "حافظ على التوازن بين العمل والحياة الشخصية. اهتم بتغذيتك وممارسة الرياضة بانتظام.";
    } else if (age < 60) {
        return "فكر في التخطيط لتقاعدك واستثمر في علاقاتك العائلية.";
    } else {
        return "استمتع بوقتك مع العائلة والأحفاد. شارك خبراتك وحكمتك مع الآخرين.";
    }
}

// Function to Calculate Love Percentage
function calculateLove() {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    
    if (name1 && name2) {
        const lovePercentage = Math.floor(Math.random() * 101);
        let message = getLoveMessage(lovePercentage);
        document.getElementById('result').innerHTML = `نسبة الحب بين ${name1} و ${name2} هي: ${lovePercentage}%<br>${message}`;
        document.getElementById('shareButtons').style.display = 'block';
        playSound('resultSound');
    } else {
        alert("الرجاء إدخال الاسمين!");
    }
}

// Function to Get Love Message
function getLoveMessage(percentage) {
    if (percentage < 50) {
        return "غير يسطا العلاقه دي مش نافعة 😂";
    } else if (percentage < 80) {
        return "العب يا برعي يا خاربها 😂";
    } else {
        return "اوبا! يا مقطع السمكة وديلها 😂";
    }
}

// Function to Share on Social Media
function share(platform) {
    const result = document.getElementById('result').innerText;
    let url = '';
    if (platform === 'facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(result)}`;
    } else if (platform === 'twitter') {
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}&url=${encodeURIComponent(window.location.href)}`;
    }
    window.open(url, '_blank');
}

// Function to Play Sound
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

// Welcome Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('welcomeScreen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('mainPage').classList.remove('hidden');
            document.getElementById('mainPage').classList.add('show');
        }, 1000);
    }, 3000);
});
