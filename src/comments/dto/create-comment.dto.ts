import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    postId: number;

    // @IsOptional()
    // image: string; 

    // @IsOptional()
    // userId: number; 
}