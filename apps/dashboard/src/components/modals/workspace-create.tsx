import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { trpc } from "../../lib/trpc";
import { useWorkspaceCreateStore } from "../../store/workspace";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const createWorkspaceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  logo: z.string().optional(),
  metadata: z.string().optional(),
});

type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;

export function WorkspaceCreateModal() {
  const utils = trpc.useUtils();
  const { isOpen, setOpen, resetForm } = useWorkspaceCreateStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CreateWorkspaceFormData>({
    name: "",
    slug: "",
    logo: "",
    metadata: "",
  });

  const createWorkspaceMutation =
    trpc.organization.createOrganization.useMutation({
      onSuccess: () => {
        toast.success("Workspace created successfully");
        resetForm();
        setFormData({ name: "", slug: "", logo: "", metadata: "" });
        utils.organization.getOrganizations.invalidate();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create workspace");
      },
    });

  const validateForm = (): boolean => {
    try {
      createWorkspaceSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim()
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  const handleInputChange = (
    field: keyof CreateWorkspaceFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug when name changes
    if (field === "name") {
      const generatedSlug = generateSlug(value);
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    createWorkspaceMutation.mutate(formData);
  };

  const handleClose = () => {
    setOpen();
    setFormData({ name: "", slug: "", logo: "", metadata: "" });
    setErrors({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="m-0 h-auto w-full max-w-full overflow-hidden border-none select-text md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal md:text-3xl lg:text-4xl">
            Create Workspace
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter workspace name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={createWorkspaceMutation.isPending}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              placeholder="Enter workspace slug (e.g., my-workspace)"
              value={formData.slug}
              onChange={(e) => handleInputChange("slug", e.target.value)}
              disabled={createWorkspaceMutation.isPending}
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL (Optional)</Label>
            <Input
              id="logo"
              type="url"
              placeholder="Enter logo URL"
              value={formData.logo}
              onChange={(e) => handleInputChange("logo", e.target.value)}
              disabled={createWorkspaceMutation.isPending}
            />
            {errors.logo && (
              <p className="text-sm text-red-500">{errors.logo}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (Optional)</Label>
            <Textarea
              id="metadata"
              placeholder="Enter additional metadata (JSON format)"
              value={formData.metadata}
              onChange={(e) => handleInputChange("metadata", e.target.value)}
              disabled={createWorkspaceMutation.isPending}
              rows={3}
            />
            {errors.metadata && (
              <p className="text-sm text-red-500">{errors.metadata}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createWorkspaceMutation.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createWorkspaceMutation.isPending}
              className="flex-1"
            >
              {createWorkspaceMutation.isPending
                ? "Creating..."
                : "Create Workspace"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
