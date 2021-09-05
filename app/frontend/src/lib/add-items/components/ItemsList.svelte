<script>
  import { useParams } from "svelte-navigator";
  import api from "../../../services/api";
  import { shopList } from "../addItemsStore";

  const params = useParams();

  async function handleRemoveItem(itemId) {
    await api.delete(`/shoppingLists/${$params.id}/items/${itemId}`);
    $shopList.items = $shopList.items.filter((item) => item.id !== itemId);
  }
</script>

<main>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#if $shopList.items}
        {#each $shopList.items as item}
          <tr>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>
              <button type="button" on:click={() => handleRemoveItem(item.id)}
                >Remove</button
              >
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</main>
