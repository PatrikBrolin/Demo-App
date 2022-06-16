import React from "react";
import './ErrorMessage.scss'

const ErrorMessage = (props) => {
  //modul som öppnas vid felinmatning

  //går att stänga ner med klick på knapp eller på backdrop
	return (
		<div>
      <div className="backdrop" onClick={props.onConfirm}/>
			<div className="error-module">
				<p className="error-message">{props.message}</p>
        <footer>
				<button onClick={props.onConfirm}>Close</button>
			</footer>
			</div>
		</div>
	);
};

export default ErrorMessage;
