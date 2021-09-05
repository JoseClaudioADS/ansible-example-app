<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import api from "../../services/api";
  import { shopList } from "./addItemsStore";
  import ItemsList from "./components/ItemsList.svelte";
  import NewItem from "./components/NewItem.svelte";

  const params = useParams();

  $: onMount(async () => {
    const { data } = await api.get(`/shoppingLists/${$params.id}`);
    shopList.set(data);
  });
</script>

<main>
  Shopping list items - {$shopList.title}

  <NewItem />
  <ItemsList />
</main>
