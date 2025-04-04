import HeaderAuthentication from "../../../src/components/Header/HeaderContent/HeaderAuthentication";
import { fireEvent, render, screen } from "@testing-library/react";
import logoutService from "../../../src/service/logout";

jest.mock("../../../src/service/logout", () => jest.fn());

describe("HeaderAuthentication", () => {
  it("renders content for an authenticated user", () => {
    const mockedLoggedCurrentUser = { ok: true };
    render(
      <HeaderAuthentication currentUser={mockedLoggedCurrentUser as UserOn} />
    );
    expect(screen.getByTestId("header-user-authenticated")).toBeInTheDocument();
    expect(
      screen.queryByTestId("header-user-unauthenticated")
    ).not.toBeInTheDocument();
  });

  it("calls logout service when pushed logout trigger and then confirm logout button", () => {
    const mockedLoggedCurrentUser = { ok: true };
    render(
      <HeaderAuthentication currentUser={mockedLoggedCurrentUser as UserOn} />
    );
    const logoutTrigger = screen.getByTestId(
      "header-user-authenticated-logout-trigger"
    );
    fireEvent.click(logoutTrigger);
    const logoutButton = screen.getByTestId(
      "header-user-authenticated-logout-button"
    );
    fireEvent.click(logoutButton);
    expect(logoutService).toHaveBeenCalled();
  });

  it("renders content for a unauthenticated user", () => {
    const mockedLoggedCurrentUser = { ok: false };
    render(
      <HeaderAuthentication currentUser={mockedLoggedCurrentUser as UserOff} />
    );
    expect(
      screen.getByTestId("header-user-unauthenticated")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("header-user-authenticated")
    ).not.toBeInTheDocument();
  });

  it("calls login service when pushed login trigger", () => {
    const mockedLoggedCurrentUser = { ok: false };
    render(
      <HeaderAuthentication currentUser={mockedLoggedCurrentUser as UserOn} />
    );
    const loginTrigger = screen.getByTestId(
      "header-user-unauthenticated-login-trigger"
    );
    fireEvent.click(loginTrigger);
    const loginScreen = screen.getByTestId(
      "header-user-unauthenticated-login-screen"
    );
    expect(loginScreen).toBeInTheDocument();
  });
});
