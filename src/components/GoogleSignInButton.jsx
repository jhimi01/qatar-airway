const GoogleSignInButton = () => {
    const handleGoogleSignIn = () => {
      window.location.href = "http://localhost:5000/auth/google";
    };
  
    return (
      <button
        onClick={handleGoogleSignIn}
        className="hover:bg-gray-300 rounded-full bg-gray-200 w-full py-1 flex justify-center items-center"
      >
        <img
          src="https://storage.googleapis.com/libraries-lib-production/images/GoogleLogo-canvas-404-300px.original.png"
          alt="google icon"
          className="h-14 w-14"
        />
      </button>
    );
  };
  
  export default GoogleSignInButton;
  