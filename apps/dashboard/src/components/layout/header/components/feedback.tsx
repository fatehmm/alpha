import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { feedbackServices } from "@/services/feedback";
import { pages } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Ratings from "@/components/ui/ratings";
import { Textarea } from "@/components/ui/textarea";

const sendFeedbackSchema = z.object({
  rating: z.number().min(1, { message: "This field is required" }),
  note: z.string().min(1, { message: "This field is required" }),
});

type FormSchemaType = z.infer<typeof sendFeedbackSchema>;

export function Feedback() {
  const location = useLocation();
  const [opened, setOpened] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(sendFeedbackSchema),
    defaultValues: {
      rating: 1,
      note: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: feedbackServices.sendFeedback,
    onSuccess: () => {
      form.reset();
      setOpened(false);
      toast("Success!", { description: "Thanks for your feedback!" });
    },
  });

  return (
    <Popover
      onOpenChange={(open) => {
        form.reset();
        setOpened(open);
      }}
      open={opened}
    >
      <PopoverTrigger asChild>
        <Button variant="secondary">Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="bottom" align="end">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) =>
                  mutate({
                    ...data,
                    categoryId:
                      pages.find(
                        (p) => p.href === location.pathname.split("/")[1]
                      )?.id ?? 7,
                  })
                )}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="How can we improve?"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Ratings
                          asInput
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    Need help?{" "}
                    <a href="mailto:support@dind.io" className="underline">
                      E-mail
                    </a>
                  </p>
                  <Button type="submit" loading={isPending}>
                    Send
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>

    // <Popover
    //   width={300}
    //   trapFocus
    //   withArrow
    //   shadow="md"
    //   position="bottom-end"
    //   opened={opened}
    //   onChange={setOpened}
    // >
    //   <Popover.Target>
    //     <Button onClick={() => setOpened((o) => !o)}>Feedback</Button>
    //   </Popover.Target>
    //   <Popover.Dropdown>
    //     <form
    //       onSubmit={form.handleSubmit((data) =>
    //         mutate({
    //           ...data,
    //           categoryId:
    //             pages.find((p) => p.href === location.pathname.split("/")[1])
    //               ?.id ?? 7,
    //         })
    //       )}
    //       className="flex flex-col gap-4"
    //     >
    //       <Textarea
    //         control={form.control}
    //         name="note"
    //         placeholder="How can we improve?"
    //         rows={3}
    //       />
    //       <Rating
    //         control={form.control}
    //         name="rating"
    //         size="md"
    //         // @ts-ignore
    //         color="yellow.6"
    //       />
    //
    //     </form>
    //   </Popover.Dropdown>
    // </Popover>
  );
}
