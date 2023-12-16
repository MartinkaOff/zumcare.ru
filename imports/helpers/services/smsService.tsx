import { Client, Session, Specialist } from '../types';

type dataProps = {
  client: Client;
  clientPhone: string;
  specialist: Specialist;
  specialistPhone: string;
  selectedDays: object[];
  sessions?: Session[];
};

const request = async (
  url: string,
  method,
  body,
  headers = { 'Content-Type': 'application/x-www-form-urlencoded' },
  // headers,
) => {
  try {
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();
  } catch (e) {
    throw e;
  }
};

export function sendSmsMessage({ data }: { data: dataProps }) {
  request(
    'https://api.mobizon.kz/service/message/sendSmsMessage?output=json&api=v1&apiKey=kz6131522bd1526b25dfb7f53fe5adf0f35b5083da29f15c3de5b6b5e08aa04408403e',
    'POST',
    `recipient=${data.clientPhone}&text=Вас+приветствует+www.zoomcare.kz
Вы+записались+на+консультацию+к+${
      data.specialist?.name
    }+на+${data.selectedDays[0].toLocaleString()}
Формат+онлайн+на+сайте+zoomcare
По+вопросам+звоните+в+поддержку++7+707+972+5098&params%5Bvalidity%5D=1440`,
  )
    .then((response) => response)
    .then((data) => data);
  request(
    'https://api.mobizon.kz/service/message/sendSmsMessage?output=json&api=v1&apiKey=kz6131522bd1526b25dfb7f53fe5adf0f35b5083da29f15c3de5b6b5e08aa04408403e',
    'POST',
    `
    recipient=${data.specialistPhone}&text=Вас+приветствует+www.zoomcare.kz
К+вам+записались+на+консультацию+${
      data.client?.name
    }+на+${data.selectedDays[0].toLocaleString()}
Формат+онлайн+на+сайте+zoomcare
По+вопросам+звоните+в+поддержку++7+707+972+5098&params%5Bvalidity%5D=1440`,
  )
    .then((response) => response)
    .then((data) => data);

  request(
    'https://api.mobizon.kz/service/message/sendSmsMessage?output=json&api=v1&apiKey=kz6131522bd1526b25dfb7f53fe5adf0f35b5083da29f15c3de5b6b5e08aa04408403e',
    'POST',
    `
    recipient=77079725098&text=Новая+запись+www.zoomcare.kz
${data.specialist?.name}
${data.client?.name}+на+${data.selectedDays[0].toLocaleString()}
${data?.sessions && data?.sessions?.at(-1).online}
Свяжитесь+с+клиентом+${data.clientPhone}+и+специалистом+${
      data.specialistPhone
    }&params%5Bvalidity%5D=1440`,
  )
    .then((response) => response)
    .then((data) => data);
}
