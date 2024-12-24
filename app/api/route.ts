import { NextResponse } from 'next/server';

export const GET = async (req) => { 
  try {
    return NextResponse.json({ message: "hello" });  // Wrap "hello" in an object
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ 
      error: error.message 
    }, { 
      status: 500 
    });
  }
}
