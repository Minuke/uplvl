import { computed, Service, signal } from '@angular/core';
import type { LoginCredentials, RegisterData } from '@core/models/auth-credentials.model';
import type { User } from '@core/models/user.model';

type RegisteredUser = User & { password: string };

@Service()
export class AuthStore {
  // "Base de datos" simulada en memoria, con un usuario demo ya precargado
  // para poder probar el login sin tener que registrarse antes.
  private readonly _registeredUsers = signal<RegisteredUser[]>([
    { id: 'u1', name: 'Usuario Demo', email: 'demo@uplvl.app', password: 'demo1234' },
  ]);

  private readonly _currentUser = signal<User | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  /**
   * Intenta iniciar sesión. Devuelve true si las credenciales coinciden
   * con algún usuario registrado, false si no.
   */
  login(credentials: LoginCredentials): boolean {
    const match = this._registeredUsers().find(
      (user) => user.email === credentials.email && user.password === credentials.password,
    );

    if (!match) {
      return false;
    }

    const authenticatedUser = this.toPublicUser(match);
    this._currentUser.set(authenticatedUser);

    return true;
  }

  /**
   * Registra un usuario nuevo y lo deja logueado automáticamente.
   * Devuelve false si el email ya existe.
   */
  register(data: RegisterData): boolean {
    const emailAlreadyTaken = this._registeredUsers().some((user) => user.email === data.email);

    if (emailAlreadyTaken) {
      return false;
    }

    const newUser: RegisteredUser = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const updatedUsers = [...this._registeredUsers(), newUser];
    this._registeredUsers.set(updatedUsers);

    const authenticatedUser = this.toPublicUser(newUser);
    this._currentUser.set(authenticatedUser);

    return true;
  }

  logout(): void {
    this._currentUser.set(null);
  }

  /**
   * Convierte un usuario registrado (con contraseña) en la versión pública
   * (sin contraseña) que sí es seguro exponer al resto de la aplicación.
   */
  private toPublicUser(registeredUser: RegisteredUser): User {
    const publicUser: User = {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
    };

    return publicUser;
  }
}
