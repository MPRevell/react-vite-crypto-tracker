export default function TestPage() {
  return (
    <>
      <div className>Hello from the test page</div>

      <div className="sign-up-box flex flex-col w-96 justify-center">
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <button>Sign Up</button>
      </div>
    </>
  );
}
