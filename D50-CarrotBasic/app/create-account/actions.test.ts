import handleForm from "./actions";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

jest.mock("@/lib/db");
jest.mock("bcrypt");
jest.mock("@/lib/session");
jest.mock("next/navigation");

describe("handleForm", () => {
  const formData = new FormData();
  formData.append("email", "test@zod.com");
  formData.append("username", "testuser");
  formData.append("password", "password123");

  const mockUser = { id: 1 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return errors if validation fails", async () => {
    formData.set("email", "invalid-email");
    const result = await handleForm({}, formData);
    expect(result).toHaveProperty("fieldErrors");
  });

  it("should return errors if username already exists", async () => {
    db.user.findUnique.mockResolvedValueOnce(mockUser);
    const result = await handleForm({}, formData);
    expect(result).toHaveProperty("fieldErrors.username");
  });

  it("should return errors if email already exists", async () => {
    db.user.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(mockUser);
    const result = await handleForm({}, formData);
    expect(result).toHaveProperty("fieldErrors.email");
  });

  it("should create a new user and redirect to profile", async () => {
    db.user.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    db.user.create.mockResolvedValueOnce(mockUser);
    bcrypt.hash.mockResolvedValueOnce("hashedpassword");
    const mockSession = { save: jest.fn() };
    getSession.mockResolvedValueOnce(mockSession);

    await handleForm({}, formData);

    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        username: "testuser",
        email: "test@zod.com",
        password: "hashedpassword",
      },
      select: { id: true },
    });
    expect(mockSession.save).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/profile");
  });
});
