import {
  formatDateToCustomFormat,
  formatDateToYouTubeLikeFormat,
} from "../../src/utils/dates";

describe("formatDateToCustomFormat", () => {
  it("format date to custom format", () => {
    const inputData = new Date("2025/03/06 14:19").toISOString();
    const toTest = formatDateToCustomFormat(inputData);
    const expected = "6 de março de 2025, às 14:19";
    expect(toTest).toEqual(expected);
  });
});

describe("formatDateToYouTubeLikeFormat", () => {
  it("should return 'agora' when the input date is the current time", () => {
    const inputData = new Date().toISOString();
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("agora");
  });

  it("should return 'há 5 segundos' when the input date is 5 seconds ago", () => {
    const inputData = new Date(Date.now() - 5000).toISOString(); // 5 sec ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 5 segundos");
  });

  it("should return 'há 1 minuto' when the input date is 1 minute ago", () => {
    const inputData = new Date(Date.now() - 60000).toISOString(); // 1 min ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 1 minuto");
  });

  it("should return 'há 3 minutos' when the input date is 3 minutes ago", () => {
    const inputData = new Date(Date.now() - 180000).toISOString(); // 3 min ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 3 minutos");
  });

  it("should return 'há 1 hora' when the input date is 1 hour ago", () => {
    const inputData = new Date(Date.now() - 3600000).toISOString(); // 1 h ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 1 hora");
  });

  it("should return 'há 2 horas' when the input date is 2 hours ago", () => {
    const inputData = new Date(Date.now() - 7200000).toISOString(); // 2 h ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 2 horas");
  });

  it("should return 'há 1 dia' when the input date is 1 day ago", () => {
    const inputData = new Date(Date.now() - 86400000).toISOString(); // 1 day ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 1 dia");
  });

  it("should return 'há 5 dias' when the input date is 5 days ago", () => {
    const inputData = new Date(Date.now() - 432000000).toISOString(); // 5 days ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 5 dias");
  });

  it("should return 'há 1 mês' when the input date is 1 month ago", () => {
    const inputData = new Date(Date.now() - 2592000000).toISOString(); // 1 month ago (~30 days)
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 1 mês");
  });

  it("should return 'há 3 meses' when the input date is 3 months ago", () => {
    const inputData = new Date(Date.now() - 7776000000).toISOString(); // 3 months ago
    const result = formatDateToYouTubeLikeFormat(inputData);
    expect(result).toBe("há 3 meses");
  });
});
