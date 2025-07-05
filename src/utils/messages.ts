// Authentication related messages
export const authMessages = {
  // Login page messages
  login: {
    welcome: 'خوش آمدید',
    subtitle: 'لطفاً برای ادامه وارد حساب کاربری خود شوید',
    email: {
      label: 'ایمیل',
      placeholder: 'example@email.com',
      required: 'لطفاً ایمیل خود را وارد کنید',
      invalid: 'لطفاً ایمیل معتبر وارد کنید'
    },
    password: {
      label: 'رمز عبور',
      placeholder: 'رمز عبور خود را وارد کنید',
      required: 'لطفاً رمز عبور خود را وارد کنید',
      minLength: 'رمز عبور باید حداقل ۶ کاراکتر باشد'
    },
    rememberMe: 'مرا به خاطر بسپار',
    forgotPassword: 'فراموشی رمز عبور؟',
    submitButton: 'ورود',
    divider: 'یا',
    googleLogin: 'ورود با گوگل',
    githubLogin: 'ورود با گیت‌هاب',
    noAccount: 'حساب کاربری ندارید؟',
    registerLink: 'ثبت‌نام کنید',
    success: 'ورود موفقیت‌آمیز بود!',
    error: 'خطا در ورود. لطفاً دوباره تلاش کنید.',
    googleComingSoon: 'ورود با گوگل در حال توسعه...',
    githubComingSoon: 'ورود با گیت‌هاب در حال توسعه...'
  },
  // Register page messages
  register: {
    title: 'ثبت‌نام',
    subtitle: 'حساب کاربری جدید ایجاد کنید',
    fullName: {
      label: 'نام و نام خانوادگی',
      placeholder: 'نام و نام خانوادگی',
      required: 'لطفاً نام و نام خانوادگی خود را وارد کنید',
      minLength: 'نام باید حداقل ۳ کاراکتر باشد'
    },
    email: {
      label: 'ایمیل',
      placeholder: 'example@email.com',
      required: 'لطفاً ایمیل خود را وارد کنید',
      invalid: 'لطفاً ایمیل معتبر وارد کنید'
    },
    phone: {
      label: 'شماره موبایل',
      placeholder: '09123456789',
      required: 'لطفاً شماره موبایل خود را وارد کنید',
      invalid: 'لطفاً شماره موبایل معتبر وارد کنید'
    },
    password: {
      label: 'رمز عبور',
      placeholder: 'رمز عبور خود را وارد کنید',
      required: 'لطفاً رمز عبور خود را وارد کنید',
      minLength: 'رمز عبور باید حداقل ۸ کاراکتر باشد',
      pattern: 'رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد'
    },
    confirmPassword: {
      label: 'تکرار رمز عبور',
      placeholder: 'رمز عبور خود را تکرار کنید',
      required: 'لطفاً رمز عبور خود را تکرار کنید',
      mismatch: 'رمز عبور و تکرار آن یکسان نیستند'
    },
    agreeToTerms: {
      text: 'قوانین و شرایط',
      privacy: 'حریم خصوصی',
      accept: 'را می‌پذیرم',
      required: 'لطفاً قوانین و شرایط را بپذیرید'
    },
    submitButton: 'ثبت‌نام',
    divider: 'یا',
    googleRegister: 'ثبت‌نام با گوگل',
    githubRegister: 'ثبت‌نام با گیت‌هاب',
    hasAccount: 'قبلاً حساب کاربری دارید؟',
    loginLink: 'وارد شوید',
    success: 'ثبت‌نام موفقیت‌آمیز بود!',
    error: 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.',
    userExists: 'کاربری با این ایمیل قبلاً ثبت‌نام کرده است.',
    googleComingSoon: 'ثبت‌نام با گوگل در حال توسعه...',
    githubComingSoon: 'ثبت‌نام با گیت‌هاب در حال توسعه...'
  },
  // Insurance related messages
  insurance: {
    title: 'مدیریت بیمه‌ها',
    addNew: 'افزودن بیمه جدید',
    noInsurances: 'هیچ بیمه‌ای یافت نشد',
    addFirst: 'اولین بیمه خود را اضافه کنید',
    
    // Form fields
    form: {
      name: {
        label: 'نام بیمه',
        placeholder: 'مثال: بیمه شخص ثالث خودرو',
        required: 'لطفاً نام بیمه را وارد کنید'
      },
      type: {
        label: 'نوع بیمه',
        placeholder: 'نوع بیمه را انتخاب کنید',
        required: 'لطفاً نوع بیمه را انتخاب کنید'
      },
      startDate: {
        label: 'تاریخ شروع بیمه',
        required: 'لطفاً تاریخ شروع بیمه را وارد کنید'
      },
      endDate: {
        label: 'تاریخ پایان بیمه',
        required: 'لطفاً تاریخ پایان بیمه را وارد کنید'
      },
      paymentType: {
        label: 'نوع پرداخت',
        lump: 'یکجا',
        installment: 'اقساط'
      },
      totalAmount: {
        label: 'مبلغ کل',
        placeholder: 'مبلغ کل بیمه را وارد کنید',
        required: 'لطفاً مبلغ کل را وارد کنید'
      },
      installments: {
        label: 'اطلاعات اقساط',
        numberOfInstallments: {
          label: 'تعداد اقساط',
          placeholder: 'تعداد اقساط را وارد کنید',
          required: 'لطفاً تعداد اقساط را وارد کنید'
        },
        amountPerInstallment: {
          label: 'مبلغ هر قسط',
          placeholder: 'مبلغ هر قسط را وارد کنید',
          required: 'لطفاً مبلغ هر قسط را وارد کنید'
        },
        startDate: {
          label: 'تاریخ شروع اقساط',
          required: 'لطفاً تاریخ شروع اقساط را وارد کنید'
        }
      }
    },
    
    // Actions
    actions: {
      add: 'افزودن بیمه',
      edit: 'ویرایش',
      delete: 'حذف',
      view: 'مشاهده جزئیات'
    },
    
    // Messages
    success: {
      added: 'بیمه با موفقیت اضافه شد',
      updated: 'بیمه با موفقیت به‌روزرسانی شد',
      deleted: 'بیمه با موفقیت حذف شد'
    },
    error: {
      add: 'خطا در افزودن بیمه',
      update: 'خطا در به‌روزرسانی بیمه',
      delete: 'خطا در حذف بیمه'
    },
    
    // Insurance types
    types: {
      car: 'خودرو',
      life: 'عمر',
      home: 'خانه',
      health: 'سلامت',
      travel: 'مسافرت',
      business: 'کسب و کار',
      other: 'سایر'
    }
  }
}; 