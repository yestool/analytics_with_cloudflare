export async function insertAndReturnId(db : D1Database, sql: string, bind:unknown[]): Promise<number> { 
  try {
    let stmt = db.prepare(sql);
    if (stmt && bind.length > 0){
      stmt = stmt.bind(...bind);
    }
    const { success } = await stmt.run()
    if (success){
      let last_insert_rowid  = await db.prepare('SELECT last_insert_rowid() as lastInsertId').first('lastInsertId');
      if (last_insert_rowid){
        return Number(last_insert_rowid)
      }else {
        throw new Error('Insert failed')
      }
    }else{
      throw new Error('Insert failed')
    }
  } catch (error) {
    throw error;
  }
}

export async function insert(db : D1Database, sql: string, bind:unknown[]): Promise<Boolean|null> { 
  try {
    let stmt = db.prepare(sql);
    if (stmt && bind.length > 0){
      stmt = stmt.bind(...bind);
    }
    const { success } = await stmt.run()
    if (success){
      return success
    }else{
      throw new Error('Insert failed')
    }
  } catch (error) {
    throw error;
  }
}


