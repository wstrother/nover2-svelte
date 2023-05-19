<script>
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    let choices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    export let value = 0;
    export let disabled;

    let final;
    $: final = value > 10 ? value : 11;

    const decrement = () => {
        if (value > 1) value--;
    }

</script>

<div class="flex flex-col items-stretch min-w-1/2 mx-auto">
    <RadioGroup display="flex justify-center justify-items-stretch" >
        {#each choices as choice}
            <RadioItem 
                disabled={disabled}
                bind:group={value} 
                name="selected" 
                value={choice}
            >{choice}</RadioItem>
        {/each}

        <RadioItem
            disabled={disabled}
            bind:group={value} 
            name="selected" 
            value={final}
        >{final}</RadioItem>
    </RadioGroup>
    
    <div class="self-center">
        <button 
            disabled={disabled}
            class="btn btn-sm variant-ghost-surface hover:variant-ghost-secondary m-1" 
            on:click={decrement}
        >-</button>
        <button 
            disabled={disabled}
            class="btn btn-sm variant-ghost-surface hover:variant-ghost-secondary m-1" 
            on:click={() => {value++;}}
        >+</button>
    </div>
</div>





