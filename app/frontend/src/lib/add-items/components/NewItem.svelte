<script>
  import { useParams } from "svelte-navigator";
  import api from "../../../services/api";
  import { shopList } from "../addItemsStore";

  const params = useParams();

  let newItem = {};

  async function handleAddItem(event) {
    event.preventDefault();
    const { data } = await api.post(
      `/shoppingLists/${$params.id}/items`,
      newItem
    );
    $shopList.items = [...$shopList.items, data];
    newItem = {};
  }
</script>

<main>
  <form on:submit={handleAddItem}>
    <input bind:value={newItem.name} placeholder="Name" />
    <input bind:value={newItem.quantity} type="number" placeholder="Quantity" />
    <button type="submit">Add</button>
  </form>
</main>
