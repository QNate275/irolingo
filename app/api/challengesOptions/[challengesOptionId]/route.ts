import db from "@/db/drizzle";
import { challengesOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { challengesOptionId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challengesOptions.id, params.challengesOptionId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { challengesOptionId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const data = await db
    .update(challengesOptions)
    .set({
      ...body,
    })
    .where(eq(challengesOptions.id, params.challengesOptionId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { challengesOptionId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(challengesOptions)
    .where(eq(challengesOptions.id, params.challengesOptionId))
    .returning();

  return NextResponse.json(data[0]);
};
