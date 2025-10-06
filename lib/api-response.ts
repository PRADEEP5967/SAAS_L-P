import { NextResponse } from 'next/server'

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: {
    message: string
    code: string
  }
}

export function errorResponse(message: string, code: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
      },
    } as ApiResponse,
    { status }
  )
}

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    } as ApiResponse<T>,
    { status }
  )
}