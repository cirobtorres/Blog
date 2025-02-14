type User =
  | {
      ok: boolean;
      data: {
        id: number;
        documentId: string;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
      error: null;
    }
  | {
      ok: boolean;
      data: null;
      error: {
        status: number;
        name: string;
        message: string;
      };
    };
