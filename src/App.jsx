import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null); // we don't have any initial value


  // useCallback not re-renders the component, it just cache the function.
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (isCharacterAllowed) {
      str += `!@#$%^&*()_+:"{}<>?</>,./;'[]`;
    }
    if (isNumberAllowed) {
      str += "123456789";
    }
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomNumber);
    }
    setPassword(pass);
  }, [length, isNumberAllowed, isCharacterAllowed]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current.select(); // to show selection. Defaultly whole referenced text will be selected
    passwordRef.current.setSelectionRange(1,3) // select from index x to upto y-1 index
    // above two are only for showing selection to inhance the ux
    window.navigator.clipboard.writeText(password);  // used to put password in clipboard onClick
    //React have window object because it ullmately converted into javaScript which have window. But it will not work in NextJs b/c NextJS not have window object
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [isNumberAllowed, isCharacterAllowed, length]);

  return (
    <>
      <h1>Password Gererator</h1>
      <div>
        <input type="text"
          value={password} 
          readOnly 
          ref = {passwordRef}  // Now passwordRef.current will refer to this input field
        />
        <button
          onClick={copyPasswordToClipboard}
        >Copy</button>
      </div>
      <div>
        <input
          type="range"
          min={6}
          max={15}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <p>Length {`(${length})`}</p>
        <input
          type="checkbox"
          name=""
          id="numbers"
          defaultChecked={isNumberAllowed}
          onClick={(e) => {
            setIsNumberAllowed(e.target.checked);
          }}
        />
        <label htmlFor="numbers">Numbers</label>
        <input
          type="checkbox"
          name=""
          id="characters"
          defaultChecked={isCharacterAllowed}
          onClick={(e) => {
            setIsCharacterAllowed(e.target.checked);
          }}
        />
        <label htmlFor="characters">Characters</label>
      </div>
    </>
  );
}

export default App;
