import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";

const MockedApp = ({ children }) => {
	return (
		<Router>
			<Provider store={store}>{children}</Provider>
		</Router>
	);
};

const customRender = (ui, options) =>
	render(ui, { wrapper: MockedApp, ...options });

export * from "@testing-library/react";

export { customRender as render };
