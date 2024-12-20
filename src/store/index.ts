import { create } from "zustand";
import { IWorkspaceSettings } from "@src/interfaces/setting";
import { produce } from "immer";
import { IUser } from "@src/interfaces/user";

interface AppState {
   workspace: IWorkspaceSettings | null;
   user: IUser;
   isAuthenticated: boolean;
   setWorkspace: (workspace: IWorkspaceSettings) => void;
   authorize: (user: IUser) => void;
}

export const useAppStore = create<AppState>((set) => ({
   workspace: null,
   user: null,
   isAuthenticated: false,
   setWorkspace: (workspace) => {
      set(
         produce((state: AppState) => {
            state.workspace = workspace;
         })
      );
   },
   authorize: (user) => {
      set(
         produce((state: AppState) => {
            state.user = user;
            state.isAuthenticated = true;
         })
      );
   },
}));
