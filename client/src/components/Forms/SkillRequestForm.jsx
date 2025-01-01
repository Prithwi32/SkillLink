import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z
    .any()
    .refine(
      (file) => file,
      (file) =>
        file instanceof File
          ? "Max file size is 5MB."
          : "Please upload a valid file",
    )
    .optional(),
});

export default function SkillRequestForm() {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
  });

  //backend integration
  const { backendUrl } = useAuth();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("desc", values.description);
    if (values.image) {
      formData.append("photo", values.image); 
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/skills/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setOpen(false);
        form.reset();
        setPreviewImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to request new skill ${values.name}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e, onChange) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 hover:bg-cyan-600" variant="default">Request New Skill</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request <span className="text-blue-600">New Skill</span></DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter skill name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the skill" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Image (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          src={previewImage}
                          className="object-cover"
                          alt="Skill image"
                        />
                        <AvatarFallback>
                          <ImagePlus className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, onChange)}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload an image related to the skill (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full ${loading ? "opacity-80" : ""} bg-blue-700 hover:bg-blue-800`}
            >
              {!loading ? "Submit Request" : "Loding..."}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
