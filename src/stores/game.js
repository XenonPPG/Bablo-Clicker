import {ref, watch} from 'vue'
import {defineStore} from 'pinia'

export const useGameStore = defineStore('game', () => {
    const start = 536;
    const deadline = 836;
    const time = ref(start);

    const active = ref(true);

    const outcome = ref(null);

    function EndGame(win) {
        active.value = false;
        clearInterval(timeInterval);
        if (win) {
            outcome.value = {
                win: true,
                messages: {
                    title: 'Победа!',
                    subtitle: 'Ты выплатил долг картелю'
                },
            }
        } else {
            outcome.value = {
                win: false,
                messages: {
                    title: 'Капец',
                    subtitle: 'Картель настиг твою жопу',
                },
            }
        }
    }

    const timeInterval = setInterval(() => {
        time.value += 1;
        if(time.value >= deadline){
            EndGame(false);
        }
    }, 1000);

    function GetTime(t) {
        function Normalize(tt) {
            if (tt < 10) {
                return '0' + tt.toString();
            }
            return tt;
        }

        return {
            hours: Math.floor(t / 60),
            minutes: Normalize(Math.floor(t % 60)),
        }
    }

    return {active, deadline, start, time, EndGame, outcome, GetTime};
})
