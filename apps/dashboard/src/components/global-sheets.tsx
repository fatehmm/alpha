import { ActionConfirmModal } from "./modals/action-confirm";
import { UserCreateModal } from "./modals/user-create";
import { WorkspaceCreateModal } from "./modals/workspace-create";

export function GlobalSheets() {
  return (
    <>
      <UserCreateModal />
      <WorkspaceCreateModal />
      <ActionConfirmModal />
    </>
  );
}
