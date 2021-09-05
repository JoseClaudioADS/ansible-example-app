<script>
  import api from "../../../services/api";
  import { shopLists } from "../homeStore";

  let title = "";

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(title);
    const { data } = await api.post("/shoppingLists", { title });
    title = "";
    shopLists.update((oldValues) => [data, ...oldValues]);
  }
</script>

<main>
  <form on:submit={handleSubmit}>
    <input bind:value={title} />
    <button type="submit">Create</button>
  </form>
</main>
