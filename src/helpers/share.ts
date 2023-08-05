import type { IGifData } from "@/types";

export const shareHandler = async (gif:IGifData)=>{
	const shareData = {
		title: gif.title,
		text: gif.title,
		url: gif.embed_url,
	};
	try {
		await navigator.share(shareData);
	} catch (err) {
	}
}