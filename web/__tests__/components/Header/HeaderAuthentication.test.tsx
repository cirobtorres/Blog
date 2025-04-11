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
    expect(screen.getByTestId("hua")).toBeInTheDocument(); // hua = header-user-authenticated
    expect(screen.queryByTestId("huu")).not.toBeInTheDocument(); // hua = header-user-unauthenticated
  });

  it("calls logout service when pushed logout trigger and then confirm logout button", () => {
    const mockedLoggedCurrentUser = { ok: true };
    render(
      <HeaderAuthentication currentUser={mockedLoggedCurrentUser as UserOn} />
    );
    const logoutTrigger = screen.getByTestId("hua-logout-trigger"); // hua = header-user-authenticated
    fireEvent.click(logoutTrigger);
    const logoutButton = screen.getByTestId("hua-logout-button"); // hua = header-user-authenticated
    fireEvent.click(logoutButton);
    expect(logoutService).toHaveBeenCalled();
  });

  it("renders content for a unauthenticated user", () => {
    const mockedLoggedCurrentUser = { ok: false };
    render(
      <HeaderAuthentication currentUser={mockedLoggedCurrentUser as UserOff} />
    );
    expect(screen.getByTestId("huu")).toBeInTheDocument(); // hua = header-user-unauthenticated
    expect(screen.queryByTestId("hua")).not.toBeInTheDocument(); // hua = header-user-authenticated
  });

  it("calls login service when pushed login trigger", () => {
    const mockedLoggedCurrentUser = { ok: false };
    render(
      <HeaderAuthentication currentUser={mockedLoggedCurrentUser as UserOn} />
    );
    const loginTrigger = screen.getByTestId("huu-login-trigger"); // huu = header-user-unauthenticated
    fireEvent.click(loginTrigger);
    const loginScreen = screen.getByTestId("huu-login-screen"); // huu = header-user-unauthenticated
    expect(loginScreen).toBeInTheDocument();
  });
});
