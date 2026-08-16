export interface UserApi {
  id: number;
  name: string;
  email: string;
}

export interface CourseApi {
  id: number;
  title: string;
}

export function simulateApiFailure(): boolean {
  return false;
}

export async function fetchUsers(): Promise<UserApi[]> {
  try {
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }

    const data: UserApi[] = (await response.json()) as UserApi[];
    return data;
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "An unknown error occurred while fetching users.";
    throw new Error(message);
  }
}

export async function fetchCourses(): Promise<CourseApi[]> {
  try {
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Failed to fetch courses.");
    }

    const data: Array<{ id: number; title: string }> = (await response.json()) as Array<{
      id: number;
      title: string;
    }>;

    return data.map((post) => ({
      id: post.id,
      title: post.title,
    }));
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "An unknown error occurred while fetching courses.";
    throw new Error(message);
  }
}
