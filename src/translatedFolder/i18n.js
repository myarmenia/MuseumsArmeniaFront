import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      am: {
        translation: {
          // ========NavMenuItem=======================
          navMenuItems: [
            'Գլխավոր',
            'Թանգարաններ',
            'Միջոցառումներ',
            'Խանութ',
            'Նորություններ',
            'Մեր մասին',
            'Կապ մեզ հետ',
            'FAQ',
            'Տոմսերի գնում և վերադարձ',
            'Գաղտնիության քաղաքականություն'

          ],

          // ==============Buttons===================

          buttons: [
            'Գնել հիմա',
            'Տեսնել Բոլորը',
            'Ուղարկել',
            'Ավելացնել',
          ],

          footer_title: 'Հայաստանի Հանրապետության Կրթության Գիտության Մշակույթի և Սպորտի նախարարություն',

          news_section_title: 'ՎԵՐՋԻՆ ՆՈՐՈՒԹՅՈՒՆՆԵՐ',

          aboute_us_section_title : [
            'ԿԱՐԴԱՑԵՔ',
            'ՄԵՐ ՄԱՍԻՆ'
          ],

          abouteUs_section_info: 'Հայաստանի պատմության թանգարանը ազգային նշանակության մշակութային կազմակերպություն է, որն ավելի քան մեկ դար ձեռք է բերել, հավաքել, հայտնաբերել, հաշվառել, պահպանել, ուսումնասիրել, մեկնաբանել և ցուցադրել Հայաստանին և հայ ժողովրդին առնչվող շոշափելի և ոչ նյութական մշակութային արժեքներ։ , նպաստելով գիտությանը, կրթությանը, զբոսաշրջությանը։ զարգացում. Հիմնվելով մոտ չորս հարյուր հազար հնագիտական, ազգագրական, դրամագիտական և այլ հավաքածուների վրա՝ թանգարանը փորձում է կամրջել անցյալն ու ապագան։ Թանգարանային հավաքածուն արտացոլում է Հայաստանի մշակույթի և պատմության ամբողջական պատկերը՝ սկսած նախապատմական ժամանակներից (մեկ միլիոն ութ հարյուր հազար տարիներ առաջ) առ այսօր։ Թանգարանը ստեղծվել է Հայաստանի Առաջին Հանրապետության խորհրդարանի 439 օրենքով (09.09.1919 թ.)։ Այն կոչվել է Ազգագրական-մարդաբանական թանգարան-գրադարան։ Այն բացվել է այցելուների համար 1921թ. օգոստոսի 20-ին։ Անվանափոխության ենթարկվել։ Հայաստանի պետական կենտրոնական (1922), մշակութային-պատմական (1931), պատմական (1935), Հայաստանի պատմության պետական թանգարան (1962) և Հայաստանի պատմության թանգարան (2003 թ.)։',


          museum_slide_title: [
            'Ընտրեք թանգարաննները',
            'ՄԵՐ ԹԱՆԳԱՐԱՆՆԵՐԸ',
          ],

          contact_us_section: [
            'ԿԱՊ ՄԵԶ ՀԵՏ',
            'Անուն',
            'Հեռախոս',
            'Էլ. փոստ'
          ],

          souvenirs_title: [
            'ՄԵՐ ԱՊՐԱՆՔՆԵՐԸ',
            'ՀՈՒՇԱՆՎԵՐՆԵՐԻ ԱՌՑԱՆՑ ԽԱՆՈՒԹ',
          ],

          login_btn: 'Մուտք',

          placeholder: [
            'Էլ. հասցե',
            'Գաղտնաբառ',
            'Հիշիր ինձ',
            'Անուն',
             'Ազգանուն',
             'Էլ. փոստ',
             'Հաստատել գաղտնաբառը',
             'Հեռախոսահամար',
          ],


          reset_password_btn: [
            'Մոռացել եմ գաղտնաբառը',
            'Վերականգնել'
          ],

          redirect_register: [
            'Դեռ չունեք պրոֆիլ?',
            'Գրանցվել'
          ],

          register_btn: 'Գրանցվել',

          register_text: [
            'Գրանցվեք և դուք առաջինը կիմանաք մեր թանգարանների այցելությունների և նոր միջոցառումների մասին:',
             'Մուտքագրեք ձեր անունը և ազգանունը։',
             'Մուտքագրեք ձեր էլ․ հասցեն և գաղտնաբառը՝ ձեր հաշիվ մուտք գործելու համար։',
             'Ավելացրեք ձեր բջջային հեռախոսահամարը անհրաժեշտության դեպքում ձեր հետ կապ հաստատելու համար։',
             "Լրացրեք այս մանրամասները",
             "Նշեք ձեր Սեռը"
        ],

        gender_type: [
          'Իգական',
          'Արական',
          'Այլ'
        ],

        validation_inp: [
          'Գրեք ճիշտ էլ. հասցե:',
          'Այս դաշտը պարտադիր է',
          'Գաղտնաբառը պետք է պարունակի առնվազն 8 նիշ',
          'Գաղտնաբառը պետք է պարունակի թիվ',
          'Գաղտնաբառը պետք է պարունակի փոքրատառեր',
          'Գաղտնաբառը պետք է պարունակի մեծատառ',
          'Պարտադիր գրել գաղտնաբառը',
          'Գաղտնաբառները չեն համնկնում',
          'Գրել միայն թվանշան'
          ],

          verifyAccount: [
            'Ստուգման Էլ․ հասցե',
            'Ստացեք նոր կոդ',
            'Եթե ​​կոդ չե՞ք ստացել',
            'Կրկին ուղարկել՝',
            'վայրկյան հետո'
          ],

          reset_password: [
            'Վերականգնել Գատնաբառը',
            'Դուք կստանաք նամակ՝ ձեր գաղտնաբառը վերականգնելու համար',
            'Գրել նոր գաղտնաբառ'
          ],

        

          country:[
            {
             "hy": "յհվբյկբն"
            },
            {
              "aa": "լիւհւիօհյ"
            }
          ]


        },
      },
      ru: {
        translation: {
          // ========NavMenuItem=======================
          navMenuItems: [
            'Главный',
            'Музеи',
            'События',
            'Магазин',
            'Новости',
            'О нас',
            'Связаться с нами',
            'FAQ',
            'Покупка и возврат билетов',
            'Политика конфиденциальности'
          ],

          // ==============Buttons===================

          buttons: [
            'Купить сейчас',
            'Увидеть все',
            'Отправлять',
            'Добавлять',
          ],

          footer_title: 'Министерство образования, науки, культуры и спорта Республики Армения',

          news_section_title: 'ПОСЛЕДНИЕ НОВОСТИ',

          aboute_us_section_title : [
            "ЧИТАТЬ",
            'О НАС',
          ],

          abouteUs_section_info: 'Музей истории Армении – культурная организация национального значения, которая на протяжении более века приобретала, собирала, открывала, записывала, сохраняла, изучала, интерпретировала и экспонировала материальные и нематериальные культурные ценности, связанные с Арменией и армянством. люди. , вклад в науку, образование, туризм. разработка. Основываясь на около четырехстах тысячах археологических, этнографических, нумизматических и других коллекций, музей пытается соединить прошлое и будущее. Коллекция музея отражает полную картину культуры и истории Армении, начиная с доисторических времен (миллион восемьсот тысяч лет назад) и до наших дней. Музей был основан Законом 439 Парламента Первой Республики Армения (09.09.1919). Он назывался Этнографо-антропологический музей-библиотека. Он был открыт для посетителей в 1921 году. 20 августа. Происходит смена имени. Государственный центр Армении (1922 г.), Культурно-исторический (1931 г.), Исторический (1935 г.), Государственный музей истории Армении (1962 г.) и Музей истории Армении (2003 г.).',

          museum_slide_title: [
            'Выбирайте музеи',
            'НАШИ МУЗЕИ',
          ],

          contact_us_section: [
            'КОНТАКТЫ С НАМИ',
            'Имя',
            'Телефон',
            "Электронная почта"
          ],

          souvenirs_title: [
            'НАШИ ПРОДУКТЫ',
            'ОНЛАЙН МАГАЗИН СУВЕНИРОВ',
          ],

          login_btn: 'Вход',

          placeholder: [
            'Эл. адрес',
            'Пароль',
            'Запомнить меня',
            'Имя',
             'Фамилия',
             'Эл. почта',
             'Подтвердите пароль',
             'Номер телефона',
          ],

          
          reset_password_btn: [
            'Я забыл пароль',
            ' Восстановить'
          ],

          redirect_register: [
            'У вас еще нет профиля?',
            'Регистрация'
          ],

          register_btn: 'Регистрация',

          register_text: [
            'Зарегистрируйтесь и вы будете первыми узнавать о наших посещениях музеев и новых мероприятиях.',
            'Введите свое имя и фамилию.',
            'Введите адрес электронной почты адрес и пароль для доступа к вашей учетной записи.',
            'Добавьте номер своего мобильного телефона, чтобы при необходимости связаться с вами.',
            'Заполните эти данные',
            'Введите свой пол',
          ],

          gender_type: [
              'Женский',
             'Мужской',
             'Другой'
          ],

          validation_inp: [
          'Напишите правильный E-mail! адрес:',
          'Это поле обязательно к заполнению',
          'Пароль должен содержать не менее 8 символов',
          'Пароль должен содержать цифру',
          'Пароль должен содержать строчные буквы',
          'Пароль должен содержать заглавную букву',
          'Вы должны написать пароль',
          'Пароли не совпадают',
          'Записать только цифру'
          ],


          verifyAccount: [
            'Проверить электронную почту адрес',
            'Получить новый код',
            'Если вы не получили код',
            'Отправить:',
            "секунду спустя"
          ],

          reset_password: [
            'Сброс пароля',
            'Вы получите электронное письмо для сброса пароля',
            'Напишите новый пароль'
          ],


          country:[
            {
             "hy": "ффффф"
            },
            {
              "aa": "дддддд"
            }
          ]

        },
      },

      en:{
        translation: {
          // ========NavMenuItem=======================
          navMenuItems: [
            'Home',
            'Museums',
            'Events',
            'Shop',
            'News',
            'About us',
            'Contact Us',
            'FAQ',
            'Ticket purchase and return',
            'Privacy Policy',
          ],

          // ==============Buttons===================

          buttons: [
            'Buy Now',
            'See All',
            'Send',
            'Add',
          ],

          footer_title: 'Ministry of Education, Science, Culture and Sports of the Republic of Armenia',

          
          news_section_title: 'LATEST NEWS',

          aboute_us_section_title : [
            "READ",
            'ABOUT US',
          ],

          abouteUs_section_info: 'The Museum of the History of Armenia is a cultural organization of national importance, which for more than a century has acquired, collected, discovered, recorded, preserved, studied, interpreted, and exhibited tangible and intangible cultural values related to Armenia and the Armenian people. , contributing to science, education, tourism. development. Based on about four hundred thousand archaeological, ethnographic, numismatic, and other collections, the museum tries to bridge the past and the future. The museum collection reflects the complete picture of the culture and history of Armenia, starting from prehistoric times (one million eight hundred thousand years ago) until today. The museum was established by Law 439 of the Parliament of the First Republic of Armenia (09.09.1919). It was called the Ethnographic-Anthropological Museum-Library. It was opened for visitors in 1921. on August 20. Undergoing a name change. State Central of Armenia (1922), Cultural-Historical (1931), Historical (1935), State Museum of the History of Armenia (1962) and Museum of the History of Armenia (2003).',

          museum_slide_title: [
            "Choose museums",
            "OUR MUSEUMS",
          ],

          contact_us_section: [
            'CONTACT US',
            'Name',
            'Phone',
            'Email'
          ],

          souvenirs_title: [
            'OUR PRODUCTS',
            'ONLINE SOUVENIR STORE',
          ],

          login_btn: 'Sign in',

          placeholder: [
            'Email address:',
            'Password',
            'Remember me',
            'Name',
            'Surname',
            'E-mail',
            'Confirm password',
            'Phone number',
          ],


          reset_password_btn: [
            'I forgot my password',
            'Restore'
          ],

          redirect_register: [
            'Dont have a profile yet?',
            'Register'
          ],

          register_btn: 'Register',

          register_text: [
              'Register and you will be the first to know about our museum visits and new events.',
               'Enter your first and last name.',
               'Enter your email address and password to access your account.',
               'Add your mobile phone number so we can contact you if necessary.',
               "Fill in these details",
               "Enter your gender"
          ],

          gender_type: [
            'Female',
             'Male',
             'Other'
        ],

        validation_inp: [
          'Write the correct E-mail! address.',
          'This field is required',
          'The password must contain at least 8 characters',
          'Password must contain a number',
          'Password must contain lowercase letters',
          'The password must contain a capital letter',
          'You must write a password',
          'Password mismatch',
          'Write only digit'
          ],


          verifyAccount: [
            'Check Email address',
            'Get a new code',
            'If you havent received a code',
            'Resend:',
            "second later"
          ],

          reset_password: [
            'Reset Password',
            'You will receive an email to reset your password',
            'Write a new password'
          ],

          country:[
            {
             "hy": "Armenia"
            },
            {
              "aa": "Afar"
            }
          ]

        },
      },
      // Add more languages as needed
    },
    lng: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'am', // Default language
    fallbackLng: localStorage.getItem('lang'), // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;