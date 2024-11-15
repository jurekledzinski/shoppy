import { type NextRequest } from 'next/server';
// import { redirect } from 'next/navigation'

export const POST = async (request: NextRequest) => {
  //   console.log('contact api request', request);
  //   console.log('contact api response', response);
  //   const searchParams = request.nextUrl.searchParams;
  //   const query = searchParams.get('query');
  //   // query is "hello" for /api/search?query=hello
  //   res body -----------
  //   const res = await request.json();
  //   return Response.json({ res });
  //  req body formData ---------
  //   const formData = await request.formData();
  //   const name = formData.get('name');
  //   const email = formData.get('email');
  //   return Response.json({ name, email });
  // redirect ---------
  // redirect('https://nextjs.org/')

  const data = await request.json();

  console.log('data api contact body', data);
  return Response.json({ message: 'Success contact' });
};
