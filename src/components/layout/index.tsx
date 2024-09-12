import { useTheme } from "@/context/theme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="py-4 px-8 bg-gray-800 text-white flex justify-between items-center relative">
        <h1 className="text-2xl">My Todo App</h1>

        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{user.username}</span>
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          <button onClick={toggleDarkMode} className="p-2 focus:outline-none">
            {darkMode ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-auto bg-gray-800 text-white transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl">My Todo App</h1>
            <button onClick={toggleMobileMenu}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            {user && (
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium">{user.username}</span>
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <button onClick={toggleDarkMode} className="block mb-4">
              {darkMode ? (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </button>
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-8">{children}</main>

      <footer className="p-4 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Haidar Todo List App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
