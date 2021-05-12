import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty()
    description: string;

    // @IsOptional()
    // image: string; 

    // @IsOptional()
    // userId: number; 
}