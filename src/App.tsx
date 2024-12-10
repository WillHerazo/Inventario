import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoginForm } from '@/components/auth/LoginForm';
import { Dashboard } from '@/pages/Dashboard';
import { Products } from '@/pages/Products';
import { Suppliers } from '@/pages/Suppliers';
import { QRCodes } from '@/pages/QRCodes';
import { History } from '@/pages/History';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { InventoryProvider } from '@/context/InventoryContext';
import { Toaster } from '@/components/ui/sonner';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:pl-72">
        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginForm />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <AppLayout>
              <Products />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          <PrivateRoute>
            <AppLayout>
              <Suppliers />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/qr-codes"
        element={
          <PrivateRoute>
            <AppLayout>
              <QRCodes />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <AppLayout>
              <History />
            </AppLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <Router>
          <AppRoutes />
          <Toaster />
        </Router>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;