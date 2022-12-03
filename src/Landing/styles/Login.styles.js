export const styles = {
  //main container
  mainContainer: "relative w-full h-screen bg-no-repeat bg-cover bg-landing",

  //logo at top left
  logoContainer: "absolute flex items-end space-x-2 top-5 left-10",
  logoImg: "w-8 h-8 animate-pulse",
  logoCaption: "text-lg text-blue-200 uppercase",

  //left container
  leftContainer:
    "flex flex-col items-center justify-center h-screen px-8 lg:w-1/2 md:px-6",

  //login form container and caption
  formContainer:
    "w-full px-6 py-8 shadow-xl sm:py-16 xl:px-12 lg:w-2/3 rounded-xl h-fit bg-black/40 shadow-black/50 sm:w-1/2",
  titleContainer: "mb-10 sm:space-y-4 lg:mb-16",
  title: "text-4xl font-bold text-blue-500 md:text-5xl xl:text-6xl",
  subtitle: "p-1 mb-10 text-lg text-blue-100 sm:text-xl xl:text-3xl",
  subtitleSpan: "font-bold text-yellow-200",

  //login form
  form: "flex flex-col space-y-6 text-white",
  emailInput:
    "bg-transparent border-white rounded-full placeholder:text-white focus:border-yellow-200 focus:ring-yellow-200",
  pwInputContainer: "flex bg-transparent border border-white rounded-full",
  pwInput:
    "w-10/12 bg-transparent border-0 rounded-full placeholder:text-white focus:ring-0 focus:border-none",
  eyeContainer: "flex flex-col items-center justify-center w-2/12",
  eyeOpen: "text-xl text-gray-300 hover:text-white hover:cursor-pointer",
  eyeClose: "text-xl text-gray-300 hover:text-white hover:cursor-pointer",

  //login error
  loginErrorContainer: "flex items-center space-x-1 text-red-300 rounded-full",

  //submit button
  submitBtn:
    "sm:py-2.5 py-2 gradientBtn bg-gradient-to-r from-purple-500 to-blue-500 rounded-full",

  //forgot password button
  forgotPw: "text-yellow-300 text-start",
};
