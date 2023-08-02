<script>
	import { persisted } from '$lib/cookieStore'

	const store = persisted('my-cookie-name', 123)
</script>

<input bind:value={$store}/>

<pre>cookie value: {$store}</pre>
