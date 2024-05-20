import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "../components/FormSubmitButton";

export const metadata = {
  title: "Ajouter Produit - distro",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const country = formData.get("country")?.toString();
  const title = formData.get("title")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !country || !title || !imageUrl || !price) {
    throw Error("Il manque des champs requis");
  }

  await prisma.product.create({
    data: { name, description, country, title, imageUrl, price },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-20">
        Ajouter un produit
      </h1>
      <form action={addProduct}>
        <input
          className="input input-bordered w-full mb-10"
          required
          name="name"
          placeholder="Nom du groupe"
        />
        <textarea
          required
          name="description"
          placeholder="description"
          className="textarea-bordered textarea w-full mb-10"
        />
        <input
          className="input input-bordered w-full mb-10"
          required
          name="country"
          placeholder="Pays du groupe"
        />
        <input
          className="input input-bordered w-full mb-10"
          required
          name="title"
          placeholder="Titre du cd"
        />
        <input
          className="input input-bordered w-full mb-10"
          required
          name="price"
          placeholder="Prix"
          type="number"
        />
        <input
          className="input input-bordered w-full mb-10"
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
        />
        <FormSubmitButton className="w-full">
          Ajouter
        </FormSubmitButton>
      </form>
    </div>
  );
}
