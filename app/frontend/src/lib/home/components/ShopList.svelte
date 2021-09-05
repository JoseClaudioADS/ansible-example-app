<script>
  // @ts-nocheck
  import { useNavigate } from "svelte-navigator";
  import api from "../../../services/api";

  import { onMount } from "svelte";
  import { shopLists } from "../homeStore";

  const navigate = useNavigate();

  onMount(async () => {
    const { data } = await api.get("/shoppingLists");
    shopLists.set(data);
  });

  const dateFormatOptions = {
    hour12: false,
    timeZone: "America/Sao_Paulo",
    timeStyle: "short",
    dateStyle: "short",
  };

  async function handleRemove(id) {
    await api.delete(`/shoppingLists/${id}`);
    shopLists.update((oldValue) => oldValue.filter((ov) => ov.id !== id));
  }
</script>

<main>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each $shopLists as sl}
        <tr>
          <td>{sl.title}</td>
          <td
            >{new Intl.DateTimeFormat("pt-BR", dateFormatOptions).format(
              new Date(sl.createdAt)
            )}</td
          >
          <td>
            <button type="button" on:click={() => navigate(`/${sl.id}`)}
              >Detail</button
            >
            <button type="button" on:click={() => handleRemove(sl.id)}
              >Remove</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
