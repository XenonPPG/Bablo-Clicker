import {ref, computed, reactive} from 'vue'
import {defineStore} from 'pinia'
import {useMoneyStore} from "@/stores/money.js";

import Skebob from "@/assets/img/skebob.jfif";
import Yan from "@/assets/img/yan.jfif";
import Cat from "@/assets/img/cat.jpg";

export const useItemStore = defineStore('itemStore', () => {
    const money = useMoneyStore();

    const items = reactive({
        skebob: {
            name: "Скебоб",
            src: Skebob,
            price: 0.1,
            modifier: 0.01,
            description: "за клик",
            sign: '+'
        },
        yan: {
            name: "Йоп Ян",
            src: Yan,
            price: 1,
            modifier: 0.02,
            description: "в секунду",
            sign: '+'
        },
        cat: {
            name: "Mr.Penis",
            src: Cat,
            price: 15,
            modifier: 1.5,
            description: "ко всем деньгам",
            sign: 'x'
        }
    })

    const bought = reactive({});

    function GetItem(name) {
        return Object.values(items).find(i => i.name === name);
    }

    function IsMax(amount) {
        return amount === Infinity;
    }

    function GetOperation(name, amount) {
        const basePrice = GetItem(name).price;
        const currentBought = bought[name] || 0;
        if (!IsMax(amount)) {
            let price = 0;
            for (let i = 0; i < amount; i++) {
                const multiplier = Math.max(1, Math.sqrt(currentBought + i))
                price = money.Round(price + basePrice * multiplier);
            }
            return {
                price: price,
                amount: amount
            }
        } else {
            let total = 0;
            let i = 0;
            while (true) {
                const next = basePrice * Math.max(1, Math.sqrt(currentBought + i));
                if (total + next > money.money) break;
                total = money.Round(total + next);
                i++;
            }
            return {
                price: total,
                amount: i
            };
        }
    }

    function Buy(name, amount) {
        const operation = GetOperation(name, amount);
        if (operation.price > money.money) return;

        bought[name] = (bought[name] || 0) + operation.amount;
        money.money = money.Round(money.money - operation.price);
    }

    return {items, bought, GetItem, GetOperation, Buy};
})
