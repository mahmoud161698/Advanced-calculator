var birthdate;
var birthtime;
var intervalId;
var countdownInterval;

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

function showSection(section) {
    document.getElementById('ageSection').classList.add('hidden');
    document.getElementById('zodiacSection').classList.add('hidden');
    document.getElementById(section + 'Section').classList.remove('hidden');
}

function calculateAge() {
    var birthdateString = document.getElementById('birthdate').value;
    var birthtimeString = document.getElementById('birthtime').value;
    if (!birthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }
    if (!birthtimeString) {
        alert('يرجى إدخال ساعة الميلاد.');
        return;
    }

    birthdate = new Date(birthdateString + 'T' + birthtimeString);
    var today = new Date();

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

function updateAge() {
    var today = new Date();
    var ageMilliseconds = today - birthdate;
    var ageSeconds = Math.floor(ageMilliseconds / 1000);

    var seconds = ageSeconds % 60;
    var ageMinutes = Math.floor(ageSeconds / 60);
    var minutes = ageMinutes % 60;
    var ageHours = Math.floor(ageMinutes / 60);
    var hours = ageHours % 24;
    var ageDays = Math.floor(ageHours / 24);
    var days = ageDays % 30; // Assuming each month has 30 days for simplicity
    var ageMonths = Math.floor(ageDays / 30);
    var months = ageMonths % 12;
    var years = Math.floor(ageMonths / 12);

    // Calculate weeks separately
    var weeks = Math.floor(days / 7);
    days = days % 7;

    updateResultTable('ageResultTable', 'العمر', `${years} سنة و ${months} أشهر و ${weeks} أسابيع و ${days} أيام و ${hours} ساعات و ${minutes} دقائق و ${seconds} ثواني`);
}

function calculateNextBirthday() {
    var today = new Date();
    var nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(function() {
        var now = new Date();
        var timeDifference = nextBirthday - now;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            updateResultTable('ageResultTable', 'عيد ميلادك القادم', 'عيد ميلادك اليوم!');
            return;
        }

        var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        updateResultTable('ageResultTable', 'عيد ميلادك القادم', `${days} يوم, ${hours} ساعة, ${minutes} دقيقة, ${seconds} ثانية`);
    }, 1000);
}

function calculateZodiac() {
    var zodiacBirthdateString = document.getElementById('zodiacBirthdate').value;
    if (!zodiacBirthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }

    var zodiacBirthdate = new Date(zodiacBirthdateString);
    findZodiacSign(zodiacBirthdate);
}

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

function updateResultTable(tableId, key, value) {
    var table = document.getElementById(tableId);
    table.style.display = 'table';
    
    var existingRow = Array.from(table.rows).find(row => row.cells[0].textContent === key);
    
    if (existingRow) {
        existingRow.cells[1].textContent = value;
    } else {
        var newRow = table.insertRow(-1);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        cell1.textContent = key;
        cell2.textContent = value;
    }
}

function randomizeBirthTime() {
    var randomHour = Math.floor(Math.random() * 24);
    var randomMinute = Math.floor(Math.random() * 60);
    var birthtime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
    document.getElementById('birthtime').value = birthtime;
}

function contactDeveloper() {
    window.location.href = 'https://wa.me/2001104865607';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    var toggleButton = document.querySelector('.toggle-dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙';
    } else {
        toggleButton.textContent = '☀️';
    }
}

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
