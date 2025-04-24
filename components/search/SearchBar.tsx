"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar({ initialValue }: { initialValue: string }) {
	const [query, setQuery] = useState(initialValue);
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const paramsStr = query &&  query.trim() !== "" ? `?input=${query}` : "";
		router.push(`/search${paramsStr}`);
	};

	return (
		<form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
			<TextField
				placeholder="Rechercher..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				fullWidth
				sx={{ bgcolor: "white" }}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<IconButton type="submit">
									<SearchRoundedIcon/>
								</IconButton>
							</InputAdornment>
						)
					}
				}}
			/>
		</form>
	);
}
