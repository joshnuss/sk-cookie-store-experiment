<script>
	import Counter from '$lib/Counter.svelte';
	import { persisted } from '$lib/cookieStore';

	const store = persisted('test', 123)

	export let data;
</script>

<input bind:value={$store}/>

<h1>
	Hello {data.name}!
</h1>

<Counter />

{$store}

<p>
	Learn more about templates at
	<a href="https://docs.sveltelab.dev/templates" target="_blank"> docs.sveltelab.dev/templates </a>
</p>
