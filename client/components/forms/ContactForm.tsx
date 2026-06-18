"use client";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../../src/components/ui/Input";
import Textarea from "../../src/components/ui/Textarea";
import { submitContactAction } from "../../src/actions/contact";

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm();
  async function onSubmit(data: any) {
    try{
      const result = await submitContactAction(data);
      if (!result.ok) throw new Error(result.error || 'Failed')
      reset()
    }catch(err){
      console.error(err)
      alert('Error sending message. Check terminal.')
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      <Input
        {...register("name")}
        placeholder="Name"
      />
      <Input
        {...register("email")}
        placeholder="Email"
      />
      <Input
        {...register("subject")}
        placeholder="Subject"
      />
      <Textarea
        {...register("message")}
        placeholder="Message"
      />
      <Button type="submit">Send Message</Button>
    </form>
  );
}
