import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ITokens {
    @Field()
    accessToken: string;
    @Field()
    refreshToken: string;
}